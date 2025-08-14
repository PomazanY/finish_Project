
import styles from "./ButtonForm.module.css"


const ButtonForm = ({
  title,
  type = "button",
  htmlFor,
  children,
  as = "button",
  
  ...props
}) => {
  const Tag = as;

  return (
    <Tag
      type={type}
      htmlFor={Tag === "label" ? htmlFor : undefined}
      className={styles.btn}
      {...props}
    >
      {title || children}
    </Tag>
  );
};

export default ButtonForm;
