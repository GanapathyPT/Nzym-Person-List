import styles from "./Loader.module.scss";

function Loader({ open }: { open?: boolean }) {
  if (!open) return null;

  return (
    <div className={styles.loader}>
      <div />
      <div />
      <div />
    </div>
  );
}

export { Loader };
