import { SHAPES, COLORS } from "../../constants";

const NextPiece = ({ piece }) => {
  if (!piece) {
    return null;
  }

  const rawShape = SHAPES[piece.type][0];

  const grid = Array.from({ length: 4 }, () => Array(4).fill(0));

  const offsetY = Math.floor((4 - rawShape.length) / 2);
  const offsetX = Math.floor((4 - rawShape[0].length) / 2);

  rawShape.forEach((row, y) => {
    row.forEach((cell, x) => {
      grid[y + offsetY][x + offsetX] = cell;
    });
  });

  return (
    <div className="next">
      <div className="stat">Next</div>
      <div className="next-grid">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="next-cell"
              style={{
                backgroundColor: cell ? COLORS[piece.type] : "transparent",
                borderColor: cell ? undefined : "transparent",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPiece;
