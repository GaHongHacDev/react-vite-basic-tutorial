import './style.css';

const MyComponent = () => {
    const hoidanit = 'tien'; //string
    return (
        <>
            <div>{hoidanit} tran xuan - dep trai</div>
            <div className="child" style={
                {
                    color: 'red',
                    backgroundColor: 'black',
                    padding: '10px',
                    borderRadius: '5px'
                }
            }>child</div>
        </>
    );
}

export default MyComponent;