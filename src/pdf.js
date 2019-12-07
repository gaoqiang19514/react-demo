import React, { Component } from "react";
import PropTypes from "prop-types";

import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import pdfSrc from "./1.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

class Test extends Component {
  componentDidMount() {
    this.init();
  }

  async init() {
    const { src } = this.props;
    const loadingTask = pdfjs.getDocument(src);
    const scale = 1.5;
    const firstPageNumber = 1;

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(firstPageNumber);
    const viewport = page.getViewport({ scale: scale });

    // Prepare canvas using PDF page dimensions
    const canvas = this.canvasRef;
    const context = canvas.getContext("2d");

    const dpr = window.devicePixelRatio;
    canvas.height = dpr * viewport.height;
    canvas.width = dpr * viewport.width;
    context.scale(dpr, dpr);

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);

    await renderTask.promise;
  }

  render() {
    return (
      <canvas
        ref={ref => {
          this.canvasRef = ref;
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
  }
}

Test.propTypes = {
  src: PropTypes.string
};

Test.defaultProps = {
  src: pdfSrc
};

export default Test;
