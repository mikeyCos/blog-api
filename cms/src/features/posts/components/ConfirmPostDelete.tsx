import { useModalContext } from "../../../hooks/useModal";

const ConfirmPostDelete = () => {
  const { closeModal } = useModalContext();

  const onClickHandler = () => {
    console.group("onClickHandler running");
    console.log("closing modal...");
    closeModal();
    console.groupEnd();
  };

  return (
    <>
      <p>ConfirmPostDelete</p>
      <button onClick={onClickHandler}>Click me</button>
    </>
  );
};

export default ConfirmPostDelete;
