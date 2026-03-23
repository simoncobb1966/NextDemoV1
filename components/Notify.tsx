import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

type NotifyPropsTypes = {
  text: string;
};

export default function Notify(props: NotifyPropsTypes) {
  const { text } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={text}
      />
    </div>
  );
}
