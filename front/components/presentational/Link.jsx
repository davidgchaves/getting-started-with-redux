import React from 'react';

const Link = ({ active, children, onClick }) => {
  const renderAsText = <span>{children}</span>;
  const renderAsLink = (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );

  return active ? renderAsText : renderAsLink;
};

export default Link;
