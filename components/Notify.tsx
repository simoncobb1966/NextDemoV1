import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

type NotifyPropsTypes = {
  text: string;
  open: boolean;
  onClose: () => void;
};

const Notify = ({ onClose, open, text }: NotifyPropsTypes) => (
  <Box>
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={text}
    />
  </Box>
);

export default Notify;
