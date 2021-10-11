import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 0),
      display: "flex",
      justifyContent: "space-between"
    }
  })
);

interface Props {
  id: string;
  title: string;
  index: number;
}

export const NotePreview: React.FC<Props> = ({
  id,
  title,
  index,
}) => {
  const classes = useStyles();

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <Paper 
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link component={RouterLink} to={`/notes/${id}`}>
            {title}
          </Link>
        </Paper>
      )}
    </Draggable>
  );
};
