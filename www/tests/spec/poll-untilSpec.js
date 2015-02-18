describe("poll-until", function() {
    var result = 0;
    var test = 0;
  beforeEach(function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    setTimeout(function() {
      done();
    }, 10);
  });
  
  function poll(){
       test = 0;
       pollUntil(function () {
        		  test = test+1;
        		  console.log(test);
        		  if(test >= 3)
                  	return true;
                  else
                  	return false;
                  }, 50, function () { console.log(test); result = 100; });
  }
  
  it("if poll less than 3 times, result should be 0", function(done) {
      poll();
      console.log('1 fun test is: ' + test);      
	  setTimeout(function() {
        console.log('test is: ' + test);
	    expect(test).toBeLessThan(3);
		expect(result).toEqual(0);
        done();
      }, 70);
  });
  it("if poll 3 times, result should be 100", function(done) {
      poll();
      console.log('2 fun test is: ' + test);
	  setTimeout(function() {
        console.log('test is: ' + test);
	    expect(test).toBeGreaterThan(2);
        expect(result).toEqual(100);
        done();
      }, 90);
      
  });
});
