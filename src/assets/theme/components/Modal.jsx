import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

/**
 * Base Modal component using MUI Dialog, with Tailwind support via className prop.
 * Usage: <Modal open={open} onClose={closeFn}><DialogTitle>...</DialogTitle><DialogContent>...</DialogContent></Modal>
 */
const Modal = (props) => <Dialog {...props} />;

export { Modal, DialogTitle, DialogContent, DialogActions };
