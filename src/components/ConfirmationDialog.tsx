import styled from "styled-components";
import Button from "./Button";
import ButtonBack from "./ButtonBack";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContent = styled.div`
  color: #333;
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: React.FC<Props> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <DialogOverlay>
      <DialogContent>
        <p>{message}</p>
        <DialogButtons>
          <Button onClick={onConfirm}>Yes</Button>
          <ButtonBack onClick={onCancel}>No</ButtonBack>
        </DialogButtons>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ConfirmationDialog;
