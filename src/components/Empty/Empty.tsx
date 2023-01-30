import NoContent from "../../images/no-content.svg";
import styles from "./Empty.module.scss";

function Empty({ show, message }: { show?: boolean; message?: string }) {
  if (!show) return null;

  return (
    <div className={styles.empty}>
      <p>{message}</p>
      <img src={NoContent} alt="No Content" />
    </div>
  );
}

export { Empty };
