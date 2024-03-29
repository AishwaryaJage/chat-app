import React from 'react';
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

function ConditionalBadge({ condition, children }) {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
}

function IconBtnControl({
  isVisible,
  iconName,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <ConditionalBadge condition={badgeContent} />
      <Whisper
        placement="top"
        delay={0}
        delayHide={0}
        delayShow={0}
        trigger="focus"
        speaker={<Tooltip>{tooltip}</Tooltip>}
      >
        <IconButton
          {...props}
          onClick={onClick}
          circle
          size="xs"
          icon={<Icon icon={iconName} />}
        />
      </Whisper>
    </div>
  );
}

export default IconBtnControl;
