import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { DigimonInfoProps } from "./DigimonInfo.interface";

const DigimonInfo = (props: DigimonInfoProps) => {
  
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea onClick={props.onClick}>
        <CardContent
          sx={{
            background: "white",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.digimon.id}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            variant="body2"
            color="text.secondary"
          >
            {props.digimon.name}
          </Typography>
        </CardContent>
        <Box
          sx={{
            height: 140,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              height: "100%",
            }}
            src={props.digimon.image}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DigimonInfo;
