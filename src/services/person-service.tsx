import { Column } from "../components/Table/Table";
import { api } from "../utils/request";

export interface Address {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  county_code: string;
  latitude: number;
  longitude: number;
}

export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: Address;
  website: string;
  image: string;
}

export const PersonColumn: Column<Person>[] = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
    className: "cell__center",
    sorter: (a, b) => a.id - b.id,
  },
  {
    key: "avatar",
    title: "Avatar",
    dataIndex: "image",
    render: (item) => <img className="person__avatar" src={item.image} />,
  },

  {
    key: "fname",
    title: "First Name",
    dataIndex: "firstname",
    sorter: (a, b) => a.firstname.localeCompare(b.firstname),
  },

  {
    key: "lname",
    title: "Last Name",
    dataIndex: "lastname",
    sorter: (a, b) => a.lastname.localeCompare(b.lastname),
  },

  {
    key: "gender",
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) => (a.gender === "male" ? 1 : -1),
  },

  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    render: (item) => (
      <span>
        {new Date().getFullYear() - new Date(item.birthday).getFullYear()}
      </span>
    ),
    sorter: (a, b) => {
      const aAge =
        new Date().getFullYear() - new Date(a.birthday).getFullYear();
      const bAge =
        new Date().getFullYear() - new Date(b.birthday).getFullYear();
      return aAge - bAge;
    },
  },

  {
    key: "contact",
    title: "Contact",
    dataIndex: "phone",
  },
];

export async function getAllPersons(numRows = 10): Promise<Person[]> {
  const query = {
    _quantity: numRows,
  };

  return (
    await api.get<{ data: Person[] }>(`/persons`, {
      params: query,
    })
  ).data.data;
}
