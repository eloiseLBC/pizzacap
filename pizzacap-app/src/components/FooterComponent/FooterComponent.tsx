import React, { FC } from 'react';

interface FooterComponentProps {}

const FooterComponent: FC<FooterComponentProps> = () => (
    <div data-testid="FooterComponent" className="bg-primary-variant">
        FooterComponent Component
    </div>
);

export default FooterComponent;
