import React from 'react';

export default ({ data }) => {
  return (
    <div className="custom-element">
           <a href={`https://www.google.com/search?q=${data.sport}`} target="_blank">
        {data.value}
      </a>
    </div>
  );
};