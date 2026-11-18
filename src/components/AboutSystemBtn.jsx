/**
 * 給未來的接手者：
 * 如果你針對這個系統進行了功能擴充或優化，
 * 歡迎在這裡加上你的名字與更新年份！
 */


import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AboutSystemBtn({ sx = {} }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography
        component="button"
        type="button"
        onClick={handleOpen}
        sx={{
          background: "none",
          border: "none",
          padding: 0,
          color: "#7f8c8d",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontFamily: "Noto Sans TC, sans-serif",
          transition: "color 0.2s",
          "&:hover": {
            color: "#4a5568",
          },
          ...sx,
        }}
      >
        關於本系統
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            width: "90%",
            maxWidth: "360px",
            p: 1,
            position: "relative",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 14,
            color: "#888",
            "&:hover": {
              color: "#555",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "1.4rem", fontWeight: "bold" }} />
        </IconButton>

        <DialogContent sx={{ pt: 2.5, pb: 3, px: 3 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#0b57d0",
              fontWeight: "bold",
              mb: 2.5,
              fontSize: "1.25rem",
              fontFamily: "Noto Sans TC, sans-serif",
            }}
          >
            關於本系統
          </Typography>

          <Box sx={{ color: "#333", fontFamily: "Noto Sans TC, sans-serif" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.95rem",
                mb: 0.5,
                color: "#333",
                fontFamily: "Noto Sans TC, sans-serif",
              }}
            >
              2026/03
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "#333",
                fontFamily: "Noto Sans TC, sans-serif",
              }}
            >
              本系統由 <span className="underline-text">姚禹安</span> 獨立開發。
            </Typography>

            <Box
              sx={{
                borderBottom: "1px dashed #ccc",
                my: 2,
              }}
            />

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.95rem",
                mb: 0.5,
                color: "#333",
                fontFamily: "Noto Sans TC, sans-serif",
              }}
            >
              2026/12
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "#333",
                fontFamily: "Noto Sans TC, sans-serif",
              }}
            >
              交接由 <span className="underline-text">台糖台中所單位同仁</span> 維護。
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AboutSystemBtn;
