export default {
  tree: {
    base: {
        listStyle: 'none',
        backgroundColor: '#fff',
        margin: 0,
        padding: 10,
        color: '#191919',
        fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
        fontSize: '14px'
    },
    node: {
        base: {
            position: 'relative',
            padding: '0',
        },
        link: {
            cursor: 'pointer',
            position: 'relative',
            padding: '7px 5px',
            display: 'block',
        },
        activeLink: {
            background: '#f2f2f2'
        },
        toggle: {
            base: {
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top',
                height: '24px',
                width: '24px',
                padding: 10,
            },
            wrapper: {
                position: 'absolute',
                top: '31%',
                left: '61%',
                margin: '-7px 0 0 -7px',
                height: '10px'
            },
            height: 8,
            width: 8,
            arrow: {
                fill: '#191919',
                strokeWidth: 0,
            }
        },
        header: {
            base: {
                display: 'inline-block',
                verticalAlign: 'top',
                color: '#191919'
            },
            connector: {
                width: '2px',
                height: '12px',
                borderLeft: 'solid 2px black',
                borderBottom: 'solid 2px black',
                position: 'absolute',
                top: '0px',
                left: '-21px'
            },
            title: {
                lineHeight: '24px',
                verticalAlign: 'middle'
            }
        },
        subtree: {
            listStyle: 'none',
            paddingLeft: '19px',
        },
        loading: {
            color: '#E2C089'
        }
    }
}
}