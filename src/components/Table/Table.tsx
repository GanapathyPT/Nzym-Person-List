import { ReactNode } from "react";
import { Loader } from "../Loader/Loader";
import styles from "./Table.module.scss";

export interface Column {
  key: string;
  title: string;
  dataIndex: string | number;
  className?: string;
  render?: (data: any) => ReactNode;
}

interface Props<T> {
  loading?: boolean;
  columns: Column[];
  data: T[];
}

function Table<T>({ columns, data, loading }: Props<T>) {
  return (
    <table border={1} className={styles.table}>
      <Loader open={!loading} />
      <thead>
        <tr>
          {columns.map(({ title, key }) => (
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.key}>
            {columns.map(({ key, dataIndex, render, className }) => (
              <td key={key} className={className}>
                {render ? render(item) : item[dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Table };
