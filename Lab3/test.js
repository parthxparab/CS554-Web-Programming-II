const obj = {
    outer: function() {
        let val = 2
      const self1 = val
  
      const inner1 = () => {
        const self2 = val
  
        const inner2 = () => {
          const self3 = val
        }
      }
    }
  }

if(obj.self2 !== obj.self3)
{console.log('fuck u')}