import { useState } from "react";
import { Empty } from "./components/Empty/Empty";
import { Table } from "./components/Table/Table";
import { useRequest } from "./hooks/useRequest";
import { getAllPersons, Person, PersonColumn } from "./services/person-service";

function ExpandedRow({ person }: { person: Person }) {
  return (
    <div>
      <address>
        <p>No: {person.address.buildingNumber}</p>
        <p>
          Street: {person.address.street}, {person.address.streetName}
        </p>
        <p>
          City: {person.address.city}, {person.address.country}
        </p>
        <p>Zip Code: {person.address.zipcode}</p>
        <p>
          Website: <a href={person.website}>{person.website}</a>
        </p>
        <p>
          Email: <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
      </address>
    </div>
  );
}

function RowSelector({
  numRows,
  setNumRows,
}: {
  numRows: number;
  setNumRows: (num: number) => void;
}) {
  return (
    <div className="rows__selector">
      <p>Number of Rows</p>
      <select value={numRows} onChange={(e) => setNumRows(+e.target.value)}>
        <option selected>10</option>
        <option>15</option>
        <option>30</option>
        <option>50</option>
      </select>
    </div>
  );
}

function App() {
  const [numRows, setNumRows] = useState(10);
  const { data, error, loading } = useRequest(
    () => getAllPersons(numRows),
    [numRows]
  );

  if (error) return <Empty message={error.message} show />;

  return (
    <div className="container">
      <h1>Person List</h1>
      <RowSelector numRows={numRows} setNumRows={setNumRows} />
      <Table<Person>
        loading={loading}
        columns={PersonColumn}
        data={data || []}
        expandRow={{
          condition: () => true,
          render: (row) => <ExpandedRow person={row} />,
        }}
      />
    </div>
  );
}

export default App;
