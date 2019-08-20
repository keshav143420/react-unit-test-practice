import mapChooser from '../mapChooser';

describe("mapChooser",function(){
  it("returns an image filename based on the input given to it",function(){
    let expected = "portland.png";
    let actual = mapChooser("portland");
    expect(actual).toEqual(expected);
  })
  it("returns an image default filename when not location is given",function(){
    let expected = "none.png";
    let actual = mapChooser("");
    expect(actual).toEqual(expected);
  })
})
