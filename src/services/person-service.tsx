import { Column } from "../components/Table/Table";
import { api } from "../utils/request";

export interface Address {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipCode: string;
  country: string;
  country_code: string;
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

export const PersonColumn: Column[] = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
  },
  {
    key: "avatar",
    title: "Avatar",
    dataIndex: "image",
    render: (item: Person) => <img src={item.image} />,
  },

  {
    key: "fname",
    title: "First Name",
    dataIndex: "firstname",
  },

  {
    key: "lname",
    title: "Last Name",
    dataIndex: "lastname",
  },

  {
    key: "gender",
    title: "Gender",
    dataIndex: "gender",
  },

  {
    key: "age",
    title: "Age",
    dataIndex: "age",
  },

  {
    key: "contact",
    title: "Contact",
    dataIndex: "contact",
  },
];

export async function getAllPersons(): Promise<Person[]> {
  return (await api.get<{ data: Person[] }>(`/persons`)).data.data;
}
