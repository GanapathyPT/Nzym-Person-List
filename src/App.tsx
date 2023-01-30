import { Table } from "./components/Table/Table";
import { useRequest } from "./hooks/useRequest";
import { getAllPersons, Person, PersonColumn } from "./services/person-service";

function App() {
  const { data, error, loading } = useRequest(getAllPersons);

  return (
    <div className="container">
      <Table<Person>
        loading={loading}
        columns={PersonColumn}
        data={data || []}
      />
    </div>
  );
}

export default App;
