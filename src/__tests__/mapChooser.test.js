import mapChooser from '../mapChooser';

describe("mapChooser",function(){
  it("returns an image filename based on the input given to it",function(){
    let expected = "portland.jpg";
    let actual = mapChooser("portland");
    expect(actual).toEqual(expected);
  })
  it("returns an image default filename when not location is given",function(){
    let expected = "default.jpg";
    let actual = mapChooser("");
    expect(actual).toEqual(expected);
  })
})
