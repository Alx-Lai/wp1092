import Grid from '../components/Grid'
export default function Row ({row_vector,row_idx}) {
    return (
        <tr>
        {row_vector.map((row_value, row_idy) => (<Grid key={row_idy} row_idx={row_idx} row_idy={row_idy} row_value={row_value}/>))}
        </tr>
    );
};