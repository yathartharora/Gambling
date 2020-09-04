import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Link route="/">
                <a className="item">
                   GAMBLING
                </a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/developer">
                    <a className="item">
                       Developer
                    </a>
                </Link>

                <Link route="/about">
                    <a className="item">
                       About
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>

    );
}
