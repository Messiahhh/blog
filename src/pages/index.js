import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import logo from "@site/static/img/banana.jpg";
import noise from "@site/static/img/noise.png";

console.log(logo);
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    (async function () {
      const vsSource = `
      precision mediump float;

      attribute vec2 aPosition;
      attribute vec2 aUV;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      void main() {
          gl_Position = vec4(aPosition, 0.0, 1.0);
          vUV = aUV;
          vPos = aPosition;
      }
      `;
      const fsSource = `
      precision mediump float;
      
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      
      uniform float uVar;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      
      float random (vec2 st) {
          return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
      }
      
      void main() {
          vec4 color1 = texture2D(uTexture1, vUV);
          vec4 color2 = texture2D(uTexture2, vUV);
          vec4 color3 = vec4(vec3(random(vUV)), 1.);
      
          if (color2.r - uVar < 0.0) {
              discard;
          }
      
          gl_FragColor = color1;
      }
     `;

      const [banana, xeno] = await Promise.all([
        loadImage(logo),
        loadImage(noise),
      ]);
      const aka = new WebGL(document.querySelector("canvas"));
      const { gl } = aka;

      aka
        .init(vsSource, fsSource)
        .loadBuffer(
          new Float32Array([
            1.0, 1.0, 1, 1, -1.0, 1.0, 0, 1, -1.0, -1.0, 0, 0, -1.0, -1.0, 0, 0,
            1.0, -1.0, 1, 0, 1.0, 1.0, 1, 1,
          ])
        )
        .setAttrib("aPosition", 2, gl.FLOAT, false, 16, 0)
        .setAttrib("aUV", 2, gl.FLOAT, false, 16, 8)
        .loadTexture(banana)
        .setUniform("uTexture1", "uniform1i", 0)
        .loadTexture(xeno)
        .setUniform("uTexture2", "uniform1i", 1);

      let value = 0.0;
      let reverse = false;
      draw();

      function draw() {
        const uniform2 = gl.getUniformLocation(aka.program, "uVar");
        gl.uniform1f(uniform2, reverse ? (value -= 0.01) : (value += 0.01));

        if (value >= 1) {
          reverse = true;
        }

        if (value <= 0) {
          reverse = false;
        }

        aka.draw(aka.gl.TRIANGLES, 6);

        requestAnimationFrame(draw);
      }
    })();
  }, []);

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        {/* <img src={logo} style={{width: 280, borderRadius: '50%'}} />  */}
        <canvas width="300" height="300" style={{ borderRadius: '50%' }} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/HTML">
            前端博客 →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

class WebGL {
  gl;
  program;
  vs;
  fs;
  buffer;
  textures = [];

  constructor(el) {
    if (el instanceof HTMLCanvasElement) {
      this.gl = el.getContext("webgl");
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

      return this;
    } else {
      throw new Error("please pass canvas element");
    }
  }

  init(vsSource, fsSource) {
    const vs = (this.vs = this.gl.createShader(this.gl.VERTEX_SHADER));
    this.gl.shaderSource(vs, vsSource);
    this.gl.compileShader(vs);

    const fs = (this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER));
    this.gl.shaderSource(fs, fsSource);
    this.gl.compileShader(fs);

    const program = (this.program = this.gl.createProgram());
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return this;
  }

  loadBuffer(typedArray) {
    const buffer = (this.buffer = this.gl.createBuffer());
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, typedArray, this.gl.STATIC_DRAW);

    return this;
  }

  loadTexture(image) {
    const texture = this.gl.createTexture();

    this.gl.activeTexture(this.gl["TEXTURE" + this.textures.length]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image
    );

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );

    this.textures.push(texture);
    return this;
  }

  setAttrib(name, size, type, normalized, stride, offset) {
    const location1 = this.gl.getAttribLocation(this.program, name);
    this.gl.vertexAttribPointer(
      location1,
      size,
      type,
      normalized,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(location1);

    return this;
  }

  setUniform(name, type, value) {
    const location = this.gl.getUniformLocation(this.program, name);
    this.gl[type](location, value);

    return this;
  }

  draw(type, count) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(type, 0, count);
  }

  then(callback) {
    callback.call(this);

    return this;
  }
}

function loadImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = path;
    image.onload = function () {
      resolve(image);
    };
  });
}
