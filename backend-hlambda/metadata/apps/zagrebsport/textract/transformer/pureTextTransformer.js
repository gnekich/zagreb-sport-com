export const transformTextractResultToTextLines = (res) => {
    const linesFromBlock = res.Blocks.reduce((acc, block) => {
      if (block.BlockType === "LINE") {
        acc.push(block.Text);
      }
      return acc;
    }, []);
  
    return linesFromBlock.join("\n");
  };
  
  export default transformTextractResultToTextLines;
  