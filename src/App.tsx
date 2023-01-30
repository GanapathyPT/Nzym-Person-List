import { useState } from "react";
import { Empty } from "./components/Empty/Empty";
import { Table } from "./components/Table/Table";
import { useRequest } from "./hooks/useRequest";
import { getAllPersons, Person, PersonColumn } from "./services/person-service";

function App() {
  const [numRows, setNumRows] = useState(10);
  const { data, error, loading } = useRequest(
    () => getAllPersons(numRows),
    [numRows]
  );

  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
        <Empty show />
      </div>
    );

  return (
    <div className="container">
      <h1>Person List</h1>
      <div className="rows__selector">
        <p>Number of Rows</p>
        <select value={numRows} onChange={(e) => setNumRows(+e.target.value)}>
          <option selected>10</option>
          <option>15</option>
          <option>30</option>
          <option>50</option>
        </select>
      </div>
      <Table<Person>
        loading={loading}
        columns={PersonColumn}
        data={data || []}
      />
    </div>
  );
}

export default App;
