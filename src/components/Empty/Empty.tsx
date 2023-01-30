import NoContent from "../../images/no-content.svg";
import styles from "./Empty.module.scss";

function Empty({ show }: { show?: boolean }) {
  if (!show) return null;

  return (
    <div className={styles.empty}>
      <img src={NoContent} alt="No Content" />
    </div>
  );
}

export { Empty };
