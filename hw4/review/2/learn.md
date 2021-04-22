```js
class FakeSheet extends Component {
    render() {
        return (
            <div>
                <Header />
            </div>
        );
    }
}

function FakeSheet() {
    return (
        <div>
            <Header />
        </div>
    );
}

const FakeSheet = () => (
    <div>
        {" "}
        <Header />{" "}
    </div>
);
export default FakeSheet;

export default () => (
    <div>
        {" "}
        <Header />{" "}
    </div>
);

export default FakeSheet;
```
