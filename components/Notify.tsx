import Snackbar from "@mui/material/Snackbar";

type NotifyPropsTypes = {
  text: string;
  open: boolean;
  onClose: () => void;
};

const Notify = ({ onClose, open, text }: NotifyPropsTypes) => (
  <Snackbar
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    message={text}
  />
);

export default Notify;
