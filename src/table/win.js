import React from 'react';

const Win = ({ wordArray }) => {
  return (
    <div>
      {wordArray.GAME == 'WIN' && (
        <div>
          {/* Ваш компонент или содержимое, которое будет отображено только при wordArray.GAME !== 'WIN' */}
		  WIN!!
        </div>
      )}
    </div>
  );
};

export default Win;

