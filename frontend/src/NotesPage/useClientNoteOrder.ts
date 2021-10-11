import { useState, useCallback, useEffect } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

const storageKey = "tinyDovetailNoteOrder";

const getInitialState = (defaultOrderedNoteIds?: string[]) => {
  const localState = localStorage.getItem(storageKey);
  if (localState) {
    return JSON.parse(localState) as string[];
  }

  return defaultOrderedNoteIds;
};

// Manages note order state and stores it in LocalStorage
export const useClientNoteOrder = (defaultOrderedNoteIds?: string[]) => {
  const [orderedNoteIds, setOrderedNoteIds] = useState(
    getInitialState(defaultOrderedNoteIds)
  );

  // Update order with default if nothing in LS yet
  useEffect(() => {
    if (defaultOrderedNoteIds && orderedNoteIds === undefined) {
      setOrderedNoteIds(defaultOrderedNoteIds);
    }
  }, [defaultOrderedNoteIds, orderedNoteIds]);

  // Update LS on state change
  useEffect(() => {
    if (orderedNoteIds) {
      localStorage.setItem(storageKey, JSON.stringify(orderedNoteIds));
    }
  }, [orderedNoteIds]);

  //Update order on drag and drop
  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided): void => {
      if(orderedNoteIds && result.destination){
        const startIndex: number = result.source.index
        const endIndex: number = result.destination.index

        const tempOrder = Array.from(orderedNoteIds);
        const [removed] = tempOrder.splice(startIndex, 1);
        tempOrder.splice(endIndex, 0, removed);
        setOrderedNoteIds(tempOrder);
      }
    },
    [orderedNoteIds]
  );

  return {
    orderedNoteIds,
    onDragEnd
  };
};
