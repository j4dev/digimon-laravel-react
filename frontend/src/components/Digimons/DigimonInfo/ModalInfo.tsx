import { Box, Modal, Skeleton, Typography } from "@mui/material";
import { style, textCenter } from "./DigimonInfo.style";
import { ModalInfoProps } from "./DigimonInfo.interface";
import { Level, Type, Attribute, Field } from "../../../types/digimonInfo";

const ModalInfo = (props: ModalInfoProps) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.loading ? (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
          </>
        ) : (
          <>
            <Typography
              sx={textCenter}
              color="text.secondary"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {props.digimonInfo?.id}
            </Typography>
            <Typography
              sx={textCenter}
              color="text.secondary"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {props.digimonInfo?.name}
            </Typography>
          </>
        )}
        {props.loading ? (
          <Skeleton height={100} />
        ) : (
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
              src={props.digimonInfo?.images[0].href}
            />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            marginBottom: 3,
          }}
        >
          {props.loading ? (
            <>
              <Skeleton variant="rectangular" width={50} height={70} />
              <Skeleton variant="rectangular" width={50} height={70} />
              <Skeleton variant="rectangular" width={50} height={70} />
            </>
          ) : (
            <>
              <Box>
                <Typography sx={textCenter}>Level</Typography>
                {props.digimonInfo?.levels.map((level: Level) => (
                  <Typography sx={textCenter} key={level.id}>
                    {level.level}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography sx={textCenter}>Attribute</Typography>
                {props.digimonInfo?.attributes.map((attribute: Attribute) => (
                  <Typography sx={textCenter} key={attribute.id}>
                    {attribute.attribute}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography sx={textCenter}>Types</Typography>
                {props.digimonInfo?.types.map((type: Type) => (
                  <Typography sx={textCenter} key={type.id}>
                    {type.type}
                  </Typography>
                ))}
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            marginBottom: 3,
          }}
        >
          {props.loading ? (
            <Skeleton variant="rectangular" width={100} height={70} />
          ) : (
            <>
              <Typography sx={textCenter}>Fields:</Typography>
              {props.digimonInfo?.fields.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    marginBottom: 3,
                  }}
                >
                  {props.digimonInfo?.fields.map((field: Field) => (
                    <img
                      style={{
                        height: "100%",
                      }}
                      src={field.image}
                    />
                  ))}
                </Box>
              ) : (
                <Typography>No existen datos</Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalInfo;
