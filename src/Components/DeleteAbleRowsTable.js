import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Row = ({ isDeleted, children, isNew: isOld, ...props }) => {
  return (
    <StyledRow {...props} isDeleted={isDeleted}>
      {children}
    </StyledRow>
  );
};

const DeleteAbleRowsTable = () => {
  const [rowsDeleted, setRowsDeleted] = useState({});
  const [rowsToDelete, setRowsToDelete] = useState({});
  const [rows, setRows] = useState(Array.from({ length: 10 }, (_, i) => i));

  const deleteRow = (index) => {
    setRowsToDelete((prevState) => ({
      ...prevState,
      [index]: true,
    }));
    setTimeout(() => {
      setRowsDeleted((prevState) => ({
        ...prevState,
        [index]: true,
      }));
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'c') {
        setRows((prevState) => [...prevState, prevState.length]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Page>
      <Grid>
        {rows.map((row, index) => {
          return (
            !rowsDeleted[index] && (
              <Row
                color={`#${index}${index}${index}${index}${index}${index}`}
                onClick={() => deleteRow(index)}
                shouldAnimate={rowsToDelete[index]}
                key={index}
                isOld
              >
                Row {index + 1}
              </Row>
            )
          );
        })}
      </Grid>
    </Page>
  );
};

export default DeleteAbleRowsTable;

const Page = styled.div`
  background-color: #a1a1a1;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// grid of 5 columns
const Grid = styled.div`
  display: grid;
  grid-auto-rows: 40px;
  width: 50%;
  height: 50%;
`;

// animation for row deletion
const animateRow = (props) => {
  if (props.shouldAnimate) {
    return `
      transform: translateX(400%);
      opacity: 0;
      transition: transform 0.5s ease-in-out, opacity 0.2s ease-in-out;
    `;
  }
};

const StyledRow = styled.div`
  background-color: ${(props) => props.color};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  ${animateRow}
  user-select: none;
`;
