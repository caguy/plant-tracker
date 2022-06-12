import { useApi, useModal } from "@/hooks";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PlantSvg from "@/assets/plant-monochrome.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

interface PlantProps {
  id: string;
  name: string;
  isFetching?: boolean;
  isNew?: boolean;
}

const Plant = ({ id, name, isFetching, isNew }: PlantProps) => {
  const { useUpdatePlant, useDeletePlant } = useApi();
  const update = useUpdatePlant();
  const remove = useDeletePlant();

  const theme = useTheme();
  const [plantName, setPlantName] = useState(name);
  const navigate = useNavigate();
  const modal = useModal();

  const nameRef = useRef<HTMLInputElement>();

  const disabled = isFetching || remove.isLoading;

  function onPlantNameChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPlantName(event.target.value);
  }

  async function onPlantNameBlur() {
    await update.mutateAsync({ id, data: { name: plantName } });
  }

  async function onPlantDelete() {
    modal.open(
      <DeleteModal
        onClose={modal.close}
        onConfirm={async () => {
          modal.close();
          await remove.mutateAsync(id);
          navigate("/");
        }}
      />
    );
  }

  useEffect(() => setPlantName(name), [name]);

  useLayoutEffect(() => {
    if (isNew && !!nameRef.current) {
      nameRef.current.focus();
      nameRef.current.setSelectionRange(0, nameRef.current.value.length);
    }
  }, [isNew]);

  return (
    <Box display="flex" alignItems="center">
      <Box
        display="inline-block"
        mr={2}
        p={1}
        width="3rem"
        height="3rem"
        borderRadius="1.5rem"
        bgcolor={(theme) => theme.palette.primary.main}
        flexShrink={0}
      >
        <PlantSvg />
      </Box>
      <Box flexGrow={1}>
        <FormControl fullWidth margin="none">
          <Input
            sx={{ ...theme.typography.h1 }}
            value={plantName}
            onChange={onPlantNameChange}
            onBlur={onPlantNameBlur}
            disabled={disabled}
            inputRef={nameRef}
          />
        </FormControl>
      </Box>
      <Box flexShrink={0} ml={1}>
        <Tooltip title="Supprimer">
          <span>
            <IconButton onClick={onPlantDelete} disabled={disabled}>
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Plant;
