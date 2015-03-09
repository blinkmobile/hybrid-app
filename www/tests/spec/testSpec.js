describe("test", function() {
  var result = 0;
  var a = 2, b = 3;
  it("calculate 2+3, the result should be 5", function() {
    result = testAddition(a, b);
    expect(result).toEqual(5);
  });
});
registeredJS--;
