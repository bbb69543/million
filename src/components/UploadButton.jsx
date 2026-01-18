import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadButton(props) {
  return (
    <Box sx={{ marginBottom: 0.5, width: '100%' }}>
      <p variant="body1" style={{ margin: '0 0 4px 0' }}>
        {props.label}
      </p>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        fullWidth={true}
      >
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            props.handleUpload(e, props.index);
          }}
          accept=".xls,.xlsx,.ods,.xlt"
        // multiple
        />
        {props.files[props.index] ? props.files[props.index].name : "選擇檔案"}
      </Button>
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default UploadButton;
