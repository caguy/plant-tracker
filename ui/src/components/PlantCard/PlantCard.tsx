import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import PlantSvg from "./assets/plant-monochrome.svg";
import AddIcon from "@mui/icons-material/Add";

interface PlantCardProps {
  name: string;
  newPlant?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const PlantCard = ({ name, newPlant, disabled, onClick }: PlantCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: (theme) => theme.palette.primary.light,
        height: "100%",
        borderStyle: newPlant ? "dashed" : "solid",
        opacity: (theme) =>
          disabled ? theme.palette.action.disabledOpacity : "inherit",
      }}
    >
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={onClick}
        disabled={disabled}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box
              mr={2}
              p={newPlant ? 0 : 0.75}
              width="2.25rem"
              height="2.25rem"
              borderRadius="1.125rem"
              bgcolor={(theme) =>
                newPlant ? "none" : theme.palette.primary.main
              }
              flexShrink={0}
            >
              {newPlant ? (
                <AddIcon
                  sx={{ width: "100%", height: "100%", color: "primary.main" }}
                />
              ) : (
                <PlantSvg />
              )}
            </Box>
            <Typography
              variant="h3"
              flexGrow={1}
              fontWeight={(theme) =>
                newPlant ? "regular" : theme.typography.h3.fontWeight
              }
            >
              {name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlantCard;
