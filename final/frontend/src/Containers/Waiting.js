import {Modal} from "antd";

const Waiting = ({visible, num}) => {
    return (
        <Modal
            visible={visible}
            // title={`waiting for other players... ${num}/3`}
            closable={false}
            footer={null}
            centered={true}
            // id="wait-modal"
        >
            {`waiting for other players... ${num}/3`}
        </Modal>
    )
}

export default Waiting;