let filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,fkjeri
    unit: "%"
  },

  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },



  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },

  HueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg"
  },

  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px"
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  },

  Sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  },

  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%"
  },

  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%"
  },
}

const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const filtersContainer = document.querySelector(".filters")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null
let img = null

function createFilterElement(name, unit = "%", value, min, max) {

  const div = document.createElement("div")
  div.classList.add("filter")

  const input = document.createElement("input")
  input.type = "range"
  input.min = min
  input.max = max
  input.value = value
  input.id = name

  const p = document.createElement("p")
  p.innerText = name

  div.appendChild(p)
  div.appendChild(input)

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters()
  })

  return div
}

function createFilterUI() {
  Object.keys(filters).forEach(key => {

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

    filtersContainer.appendChild(filterElement)

  })
}

createFilterUI()

imageInput.addEventListener("change", (event) => {


  const file = event.target.files[0]
  const imagePlaceholder = document.querySelector(".placeholder")
  imagePlaceholder.style.display = "none"
  imageCanvas.style.display = "block"

  console.log(file)

  img = new Image()
  img.src = URL.createObjectURL(file)

  img.onload = () => {
    imageCanvas.width = img.width
    imageCanvas.height = img.height
    canvasCtx.drawImage(img, 0, 0)
  }
})

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
  canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
  `
  canvasCtx.drawImage(img, 0, 0)
}

resetButton.addEventListener("click", () => {
  filters = {
    Brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
    },

    Contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
    },



    Saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
    },

    HueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg"
    },

    Blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px"
    },
    Grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
    },

    Sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
    },

    Opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%"
    },

    Invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
    },
  }

  applyFilters()
  filtersContainer.innerHTML = ""
  createFilterUI()
})

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a")
  link.download = "edited-image.png"
  link.href = imageCanvas.toDataURL()
  link.click()
})

const presets = {
  Normal: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Drama: {
    Brightness: 90,
    Contrast: 150,
    Saturation: 120,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Vintage: {
    Brightness: 110,
    Contrast: 80,
    Saturation: 80,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 40,
    Opacity: 100,
    Invert: 0
  },

  OldSchool: {
    Brightness: 90,
    Contrast: 110,
    Saturation: 60,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 60,
    Opacity: 100,
    Invert: 0
  },

  NoirFilm: {
    Brightness: 80,
    Contrast: 180,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Sunburn: {
    Brightness: 140,
    Contrast: 110,
    Saturation: 140,
    HueRotation: -20,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  CoolTone: {
    Brightness: 105,
    Contrast: 110,
    Saturation: 110,
    HueRotation: -30,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Retro70s: {
    Brightness: 100,
    Contrast: 90,
    Saturation: 140,
    HueRotation: -15,
    Blur: 0,
    Grayscale: 0,
    Sepia: 30,
    Opacity: 100,
    Invert: 0
  },

  HighKey: {
    Brightness: 140,
    Contrast: 70,
    Saturation: 110,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Moody: {
    Brightness: 70,
    Contrast: 140,
    Saturation: 90,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 20,
    Opacity: 100,
    Invert: 0
  },

  Vivid: {
    Brightness: 110,
    Contrast: 140,
    Saturation: 150,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  FadedMemory: {
    Brightness: 120,
    Contrast: 70,
    Saturation: 50,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 15,
    Sepia: 25,
    Opacity: 90,
    Invert: 0
  },

  Polaroid: {
    Brightness: 115,
    Contrast: 85,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0
  },

  DarkMystery: {
    Brightness: 60,
    Contrast: 160,
    Saturation: 70,
    HueRotation: 20,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0
  }
};

Object.keys(presets).forEach(presetName => {
  const presetButton = document.createElement("button")
  presetButton.classList.add("btn")
  presetButton.innerText = presetName
  presetsContainer.appendChild(presetButton)

  presetButton.addEventListener('click', () => {

    const preset = presets[presetName]

    Object.keys(preset).forEach(filterName => {
      filters[filterName].value = preset[filterName]
    })
    
    applyFilters()
    filtersContainer.innerHTML = ""
    createFilterUI()

  })

})
