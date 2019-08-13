function mapChooser(locationName){
  if (!locationName){
    locationName = 'default';
  }
  return `${locationName}.jpg`;
}
export default mapChooser;