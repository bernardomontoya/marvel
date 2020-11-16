export default function Fetch(url) {
  console.log("fetching data");
    return new Promise(resolve => {
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
              resolve(result);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    });
}