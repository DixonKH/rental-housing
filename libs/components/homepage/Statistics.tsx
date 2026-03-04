import { Box, Container, Stack, Typography } from "@mui/material";
import { FaStar, FaHome, FaComments, FaShieldAlt } from "react-icons/fa";

const statsData = [
  {
    icon: <FaStar size={32} />,
    title: "1M+ Students",
    desc: "Trusted by over one million students every year",
  },
  {
    icon: <FaHome size={32} />,
    title: "50K+ Properties",
    desc: "Wide range of verified rental properties",
  },
  {
    icon: <FaComments size={32} />,
    title: "24/7 Support",
    desc: "Dedicated support team ready to help anytime",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Secure Booking",
    desc: "Safe and secure payment & booking system",
  },
];

const Statistics = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f8fafc, #eef2f7)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          {statsData.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: "20px",
                background: "#ffffff",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  color: "#1976d2",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Statistics;