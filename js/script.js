document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // ELEMENTOS GENERALES
  // =========================================================

  const floatingImage = document.getElementById("floatingImage");
  const resetButton = document.getElementById("resetButton");

  const about = document.getElementById("about");
  const closeAbout = document.getElementById("closeAbout");

  const and = document.getElementsByClassName("and")[0];
  const bioPepo = document.getElementById("bioPepo");
  const bioTom = document.getElementById("bioTom");
  const closeE = document.getElementById("closeE");
  const closeM = document.getElementById("closeM");

  // =========================================================
  // FUNCIONES GENERALES
  // =========================================================

  function pauseFloatingImage() {
    if (floatingImage) {
      floatingImage.style.animationPlayState = "paused";
    }
  }

  function playFloatingImage() {
    if (floatingImage) {
      floatingImage.style.animationPlayState = "running";
    }
  }

  function showReset() {
    if (resetButton) {
      resetButton.style.display = "block";
    }
  }

  function hideReset() {
    if (resetButton) {
      resetButton.style.display = "none";
    }
  }

  function showWindows(windows, container = null) {
    windows.forEach((windowElement) => {
      if (windowElement) {
        windowElement.style.display = "flex";
      }
    });

    if (container) {
      container.style.display = "flex";
    }

    pauseFloatingImage();
    showReset();
  }

  function hideWindow(windowElement) {
    if (windowElement) {
      windowElement.style.display = "none";
    }

    checkOpenWindows();
  }

  // =========================================================
  // COMPROBAR SI QUEDA ALGUNA VENTANA ABIERTA
  // =========================================================

  function checkOpenWindows() {
    const windows = document.querySelectorAll(
      ".ventanaEmergente, .liveShowEmergente",
    );

    const somethingIsOpen = [...windows].some((windowElement) => {
      return getComputedStyle(windowElement).display !== "none";
    });

    // Contenedores multimedia
    const multimediaOpen = document.querySelector(".mostrar") !== null;

    // Video de Juliana Gattas
    const videoOpen = [document.getElementById("videoJGLolla")].some(
      (video) => {
        return video && getComputedStyle(video).display !== "none";
      },
    );

    // About
    const aboutOpen = about && getComputedStyle(about).display !== "none";

    // Bios
    const biosOpen =
      (bioPepo && getComputedStyle(bioPepo).display !== "none") ||
      (bioTom && getComputedStyle(bioTom).display !== "none");

    if (
      somethingIsOpen ||
      multimediaOpen ||
      videoOpen ||
      aboutOpen ||
      biosOpen
    ) {
      showReset();
    } else {
      hideReset();
      playFloatingImage();
    }
  }

  // =========================================================
  // RESET GLOBAL
  // =========================================================

  function resetAll() {
    // -----------------------------------------------------
    // Cerrar TODAS las ventanas emergentes
    // -----------------------------------------------------

    document
      .querySelectorAll(".ventanaEmergente, .liveShowEmergente")
      .forEach((windowElement) => {
        windowElement.style.display = "none";
        windowElement.classList.remove("synopsis-open");
      });

    // -----------------------------------------------------
    // Ocultar contenedores generales de categorías
    // -----------------------------------------------------

    const containersToHide = [
      "obrasEmergentes",
      "laboratoriosEmergentes",
      "residenciasEmergentes",
      "liveShowsEmergentes",
      "absoluteArchivesLab",
    ];

    containersToHide.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        element.style.display = "none";
      }
    });

    // -----------------------------------------------------
    // Ocultar archivos de laboratorios
    // -----------------------------------------------------

    document
      .querySelectorAll(
        ".laboratorio1Arch, .laboratorio2Arch, .laboratorio3Arch",
      )
      .forEach((element) => {
        element.style.display = "none";
      });

    // -----------------------------------------------------
    // ABOUT
    // -----------------------------------------------------

    if (about) {
      about.style.display = "none";
    }

    // -----------------------------------------------------
    // BIOS
    // -----------------------------------------------------

    if (bioPepo) {
      bioPepo.style.display = "none";
    }

    if (bioTom) {
      bioTom.style.display = "none";
    }

    // -----------------------------------------------------
    // VIDEOS / SOUNDCLOUD / IFRAMES
    // -----------------------------------------------------

    const iframeIds = [
      "iuniversal-video",
      "silentWalks-soundcloud",
      "shhhhPulperia-video",
      "angelPlacenta-video",
      "residenciaTecnopolis2023-video",
    ];

    iframeIds.forEach((id) => {
      const iframe = document.getElementById(id);

      if (iframe) {
        iframe.src = "";
      }
    });

    // -----------------------------------------------------
    // Cerrar contenedores multimedia
    // -----------------------------------------------------

    const multimediaContainers = [
      "container-iuniversalVideo",
      "container-silentWalksCloud",
      "container-shhhhPulperiaVideo",
      "container-angelPlacentaVideo",
      "container-residenciaTecnopolis2023Video",
    ];

    multimediaContainers.forEach((id) => {
      const container = document.getElementById(id);

      if (container) {
        container.classList.remove("mostrar");
      }
    });

    // -----------------------------------------------------
    // VIDEO JG LOLLA
    // -----------------------------------------------------

    const videoJGLolla = document.getElementById("videoJGLolla");

    if (videoJGLolla) {
      videoJGLolla.pause();
      videoJGLolla.currentTime = 0;
      videoJGLolla.style.display = "none";
    }

    // -----------------------------------------------------
    // RESET SYNOPSIS
    // -----------------------------------------------------

    document.querySelectorAll(".synopsis-toggle").forEach((toggle) => {
      toggle.textContent = "+";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mostrar sinopsis");
    });

    // -----------------------------------------------------
    // Estado inicial
    // -----------------------------------------------------

    playFloatingImage();
    hideReset();
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetAll);
  }

  // =========================================================
  // ABOUT
  // =========================================================

  function showAbout() {
    pauseFloatingImage();

    if (about) {
      about.style.display = "flex";
    }

    showReset();
  }

  if (floatingImage) {
    floatingImage.addEventListener("click", showAbout);
  }

  if (closeAbout) {
    closeAbout.addEventListener("click", () => {
      if (about) {
        about.style.display = "none";
      }

      checkOpenWindows();
    });
  }

  if (about) {
    makeElementDraggable(about);
  }

  // =========================================================
  // BIOS PEPO + TOM
  // =========================================================

  function showBios() {
    pauseFloatingImage();

    if (bioPepo) {
      bioPepo.style.display = "flex";
    }

    if (bioTom) {
      bioTom.style.display = "flex";
    }

    showReset();
  }

  if (and) {
    and.addEventListener("click", showBios);
  }

  if (closeE) {
    closeE.addEventListener("click", () => {
      hideWindow(bioPepo);
    });
  }

  if (closeM) {
    closeM.addEventListener("click", () => {
      hideWindow(bioTom);
    });
  }

  if (bioPepo) {
    makeElementDraggable(bioPepo);
  }

  if (bioTom) {
    makeElementDraggable(bioTom);
  }

  // =========================================================
  // OBRAS
  // =========================================================

  const obrasButton = document.getElementById("obras");
  const obrasContainer = document.getElementById("obrasEmergentes");

  const obras = [
    document.getElementById("obra1"),
    document.getElementById("obra2"),
    document.getElementById("obra3"),
    document.getElementById("obra4"),
    document.getElementById("obra5"),
    document.getElementById("obra6"),
    document.getElementById("obra7"),
  ];

  const obrasCloseButtons = [
    ["closeObra1", "obra1"],
    ["closeObra2", "obra2"],
    ["closeObra3", "obra3"],
    ["closeObra4", "obra4"],
    ["closeObra5", "obra5"],
    ["closeObra6", "obra6"],
    ["closeObra7", "obra7"],
  ];

  if (obrasButton) {
    obrasButton.addEventListener("click", () => {
      showWindows(obras, obrasContainer);
    });
  }

  // Cierres individuales de obras

  obrasCloseButtons.forEach(([closeId, windowId]) => {
    const closeButton = document.getElementById(closeId);
    const windowElement = document.getElementById(windowId);

    if (closeButton && windowElement) {
      closeButton.addEventListener("click", () => {
        hideWindow(windowElement);
      });

      closeButton.addEventListener("touchstart", () => {
        hideWindow(windowElement);
      });
    }
  });

  // Hacer obras draggable

  obras.forEach((obra) => {
    if (obra) {
      makeElementDraggable(obra);
    }
  });

  // =========================================================
  // SYNOPSIS DE OBRAS
  // =========================================================

  document
    .querySelectorAll("#obrasEmergentes .ventanaEmergente")
    .forEach((obra) => {
      const description = obra.querySelector(".textDescription");
      const title = description?.querySelector("h3");

      if (!description || !title) {
        return;
      }

      description.querySelectorAll("p:not(.date)").forEach((paragraph) => {
        paragraph.classList.add("sinopsis");
      });

      const toggle = document.createElement("button");

      toggle.type = "button";
      toggle.className = "synopsis-toggle";
      toggle.textContent = "+";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mostrar sinopsis");

      title.insertAdjacentElement("afterend", toggle);

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const expanded = obra.classList.toggle("synopsis-open");

        toggle.textContent = expanded ? "-" : "+";

        toggle.setAttribute("aria-expanded", String(expanded));

        toggle.setAttribute(
          "aria-label",
          expanded ? "Ocultar sinopsis" : "Mostrar sinopsis",
        );
      });
    });

  // =========================================================
  // LABORATORIOS
  // =========================================================

  const laboratoriosButton = document.getElementById("laboratorios");

  const laboratoriosContainer = document.getElementById(
    "laboratoriosEmergentes",
  );

  const archivosLabs = document.getElementById("absoluteArchivesLab");

  const laboratorios = [
    document.getElementById("laboratorio1"),
    document.getElementById("laboratorio2"),
    document.getElementById("laboratorio3"),
  ];

  const laboratoriosCloseButtons = [
    ["closeLab1", "laboratorio1", ".laboratorio1Arch"],
    ["closeLab2", "laboratorio2", ".laboratorio2Arch"],
    ["closeLab3", "laboratorio3", ".laboratorio3Arch"],
  ];

  if (laboratoriosButton) {
    laboratoriosButton.addEventListener("click", () => {
      showWindows(laboratorios, laboratoriosContainer);

      if (archivosLabs) {
        archivosLabs.style.display = "initial";

        [...archivosLabs.children].forEach((child) => {
          child.style.display = "initial";
        });
      }
    });
  }

  laboratoriosCloseButtons.forEach(([closeId, windowId, archivesClass]) => {
    const closeButton = document.getElementById(closeId);

    const windowElement = document.getElementById(windowId);

    if (closeButton && windowElement) {
      function closeLaboratorio() {
        windowElement.style.display = "none";

        document.querySelectorAll(archivesClass).forEach((element) => {
          element.style.display = "none";
        });

        checkOpenWindows();
      }

      closeButton.addEventListener("click", closeLaboratorio);

      closeButton.addEventListener("touchstart", closeLaboratorio);
    }
  });

  laboratorios.forEach((laboratorio) => {
    if (laboratorio) {
      makeElementDraggable(laboratorio);
    }
  });

  // =========================================================
  // RESIDENCIAS
  // =========================================================

  const residenciasButton = document.getElementById("residencias");

  const residenciasContainer = document.getElementById("residenciasEmergentes");

  const residencias = [
    document.getElementById("residencia1"),
    document.getElementById("residencia2"),
    document.getElementById("residencia3"),
    document.getElementById("residencia4"),
  ];

  const residenciasCloseButtons = [
    ["closeResidencia1", "residencia1"],
    ["closeResidencia2", "residencia2"],
    ["closeResidencia3", "residencia3"],
    ["closeResidencia4", "residencia4"],
  ];

  if (residenciasButton) {
    residenciasButton.addEventListener("click", () => {
      showWindows(residencias, residenciasContainer);
    });
  }

  residenciasCloseButtons.forEach(([closeId, windowId]) => {
    const closeButton = document.getElementById(closeId);

    const windowElement = document.getElementById(windowId);

    if (closeButton && windowElement) {
      closeButton.addEventListener("click", () => {
        hideWindow(windowElement);
      });

      closeButton.addEventListener("touchstart", () => {
        hideWindow(windowElement);
      });
    }
  });

  residencias.forEach((residencia) => {
    if (residencia) {
      makeElementDraggable(residencia);
    }
  });

  // =========================================================
  // COLABS / LIVE SHOWS
  // =========================================================

  const colabs = document.getElementById("colabs");

  const jgLolla2024 = document.getElementById("jgLolla2024");

  const agNosEnVera2024 = document.getElementById("agNosEnVera2024");

  const closeJGLolla = document.getElementById("closeJGLolla");

  const closeAGNosEnVera = document.getElementById("closeAGNosEnVera");

  if (colabs) {
    colabs.addEventListener("click", (event) => {
      event.stopPropagation();

      showWindows([jgLolla2024, agNosEnVera2024]);
    });
  }

  if (closeJGLolla && jgLolla2024) {
    const close = () => {
      hideWindow(jgLolla2024);
    };

    closeJGLolla.addEventListener("click", close);
    closeJGLolla.addEventListener("touchstart", close);
  }

  if (closeAGNosEnVera && agNosEnVera2024) {
    const close = () => {
      hideWindow(agNosEnVera2024);
    };

    closeAGNosEnVera.addEventListener("click", close);
    closeAGNosEnVera.addEventListener("touchstart", close);
  }

  // =========================================================
  // VIDEO JG LOLLA
  // =========================================================

  const jgLolla2024Pic = document.getElementById("jgLolla2024Pic");

  const videoJGLolla = document.getElementById("videoJGLolla");

  function hideVideoJGLolla() {
    if (!videoJGLolla) {
      return;
    }

    videoJGLolla.pause();
    videoJGLolla.currentTime = 0;
    videoJGLolla.style.display = "none";

    checkOpenWindows();
  }

  if (jgLolla2024Pic && videoJGLolla) {
    jgLolla2024Pic.addEventListener("click", (event) => {
      event.stopPropagation();

      videoJGLolla.style.display = "block";
      videoJGLolla.volume = 0.7;

      videoJGLolla.play();

      showReset();
    });

    videoJGLolla.addEventListener("ended", hideVideoJGLolla);

    videoJGLolla.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      const clickedInside =
        videoJGLolla.contains(event.target) ||
        jgLolla2024Pic.contains(event.target);

      if (!clickedInside) {
        hideVideoJGLolla();
      }
    });
  }

  // =========================================================
  // FUNCIÓN GENÉRICA PARA VIDEOS / IFRAME
  // =========================================================

  function setupIframeMedia({
    triggerId,
    containerId,
    iframeId,
    closeId,
    src,
  }) {
    const trigger = document.getElementById(triggerId);

    const container = document.getElementById(containerId);

    const iframe = document.getElementById(iframeId);

    const closeButton = document.getElementById(closeId);

    if (!trigger || !container || !iframe) {
      return;
    }

    function openMedia(event) {
      event.stopPropagation();

      container.classList.add("mostrar");
      iframe.src = src;

      showReset();
    }

    function closeMedia(event) {
      if (event) {
        event.stopPropagation();
      }

      container.classList.remove("mostrar");
      iframe.src = "";

      checkOpenWindows();
    }

    trigger.addEventListener("click", openMedia);

    if (closeButton) {
      closeButton.addEventListener("click", closeMedia);
    }

    document.addEventListener("click", (event) => {
      if (
        container.classList.contains("mostrar") &&
        !container.contains(event.target)
      ) {
        closeMedia();
      }
    });
  }

  // =========================================================
  // IUNIVERSAL
  // =========================================================

  setupIframeMedia({
    triggerId: "iuniversalPic",
    containerId: "container-iuniversalVideo",
    iframeId: "iuniversal-video",
    closeId: "closeIuniversal-video",
    src: "https://www.youtube.com/embed/xcQxfhsaTKw?si=3Tv1antKf0UEojSr&controls=0&autoplay=1",
  });

  // =========================================================
  // SILENT WALKS
  // =========================================================

  setupIframeMedia({
    triggerId: "silentWalksPic",
    containerId: "container-silentWalksCloud",
    iframeId: "silentWalks-soundcloud",
    closeId: "closeSilentWalks-soundcloud",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true",
  });

  // =========================================================
  // SHHHH! PULPERÍA
  // =========================================================

  setupIframeMedia({
    triggerId: "pulpeButton",
    containerId: "container-shhhhPulperiaVideo",
    iframeId: "shhhhPulperia-video",
    closeId: "closePulperia-video",
    src: "https://www.youtube.com/embed/UW2wEtLUTys?si=pfs8y6QFB9N-Mt_U&controls=0&autoplay=1",
  });

  // =========================================================
  // SOMBRA VIVA / SOMBRAS PAGANAS
  // =========================================================

  setupIframeMedia({
    triggerId: "sombraVivaPic",
    containerId: "container-sombraVivaVideo",
    iframeId: "sombraViva-video",
    closeId: null,
    src: "https://www.youtube.com/embed/kP1e1KU_iUU?autoplay=1&controls=0",
  });

  // =========================================================
  // ITERACIÓN Nº3
  // =========================================================

  setupIframeMedia({
    triggerId: "iteracionN3Pic",
    containerId: "container-iteracionN3Video",
    iframeId: "iteracionN3-video",
    closeId: null,
    src: "https://www.youtube.com/embed/KyNm0T0f0YA?autoplay=1&controls=0",
  });

  // =========================================================
  // ITERACIÓN Nº4: TACHADURAS
  // =========================================================

  setupIframeMedia({
    triggerId: "iteracionN4Pic",
    containerId: "container-iteracionN4Video",
    iframeId: "iteracionN4-video",
    closeId: null,
    src: "https://www.youtube.com/embed/0jHLfidkfbc?autoplay=1&controls=0",
  });

  // =========================================================
  // ANGEL PLACENTA
  // =========================================================

  setupIframeMedia({
    triggerId: "agNosEnVera2024Pic",
    containerId: "container-angelPlacentaVideo",
    iframeId: "angelPlacenta-video",
    closeId: "closeAngelPlacenta-video",
    src: "https://www.youtube.com/embed/Tph4P49p9Yc?si=TMaCfOEqTOlxvTEM",
  });

  // =========================================================
  // RESIDENCIA TECNOPOLIS
  // =========================================================

  setupIframeMedia({
    triggerId: "coproduccionTecnopolis",
    containerId: "container-residenciaTecnopolis2023Video",
    iframeId: "residenciaTecnopolis2023-video",
    closeId: null,
    src: "https://www.youtube.com/embed/HjQapERV-AE?si=72q9pgE7EabcCWgG&controls=0&autoplay=1",
  });

  // =========================================================
  // SILENT WALKS - RESIDENCIA
  // =========================================================

  const silentWalksPic1 = document.getElementById("silentWalksPic1");

  if (silentWalksPic1) {
    silentWalksPic1.addEventListener("click", (event) => {
      event.stopPropagation();

      const container = document.getElementById("container-silentWalksCloud");

      const iframe = document.getElementById("silentWalks-soundcloud");

      if (container && iframe) {
        container.classList.add("mostrar");

        iframe.src =
          "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true";

        showReset();
      }
    });
  }

  // =========================================================
  // VISIBILITY API
  // =========================================================

  document.addEventListener("visibilitychange", () => {
    const media = [
      {
        container: "container-iuniversalVideo",
        iframe: "iuniversal-video",
        src: "https://www.youtube.com/embed/xcQxfhsaTKw?si=3Tv1antKf0UEojSr&controls=0&autoplay=1",
      },
      {
        container: "container-silentWalksCloud",
        iframe: "silentWalks-soundcloud",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true",
      },
      {
        container: "container-shhhhPulperiaVideo",
        iframe: "shhhhPulperia-video",
        src: "https://www.youtube.com/embed/UW2wEtLUTys?si=pfs8y6QFB9N-Mt_U&controls=0&autoplay=1",
      },
    ];

    media.forEach((item) => {
      const container = document.getElementById(item.container);

      const iframe = document.getElementById(item.iframe);

      if (!container || !iframe) {
        return;
      }

      if (document.hidden) {
        iframe.src = "";
      } else if (container.classList.contains("mostrar")) {
        iframe.src = item.src;
      }
    });
  });

  // =========================================================
  // DRAGGABLE
  // =========================================================

  function makeElementDraggable(element) {
    if (!element) {
      return;
    }

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(event) {
      event = event || window.event;

      event.preventDefault();

      element.style.cursor = "grabbing";

      if (event.type === "touchstart") {
        pos3 = event.touches[0].clientX;
        pos4 = event.touches[0].clientY;
      } else {
        pos3 = event.clientX;
        pos4 = event.clientY;
      }

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;

      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    }

    function elementDrag(event) {
      event = event || window.event;

      event.preventDefault();

      if (event.type === "touchmove") {
        pos1 = pos3 - event.touches[0].clientX;

        pos2 = pos4 - event.touches[0].clientY;

        pos3 = event.touches[0].clientX;

        pos4 = event.touches[0].clientY;
      } else {
        pos1 = pos3 - event.clientX;

        pos2 = pos4 - event.clientY;

        pos3 = event.clientX;

        pos4 = event.clientY;
      }

      element.style.top = element.offsetTop - pos2 + "px";

      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      element.style.cursor = "grab";

      document.onmouseup = null;
      document.onmousemove = null;

      document.ontouchend = null;
      document.ontouchmove = null;
    }
  }

  // =========================================================
  // DRAGGABLE - TODAS LAS VENTANAS
  // =========================================================

  document.querySelectorAll(".ventanaEmergente").forEach((windowElement) => {
    makeElementDraggable(windowElement);
  });

  // =========================================================
  // RISITAS
  // =========================================================

  function risitas() {
    new Audio("sounds/risita.wav").play();
  }

  if (floatingImage) {
    floatingImage.addEventListener("click", risitas);
  }

  // =========================================================
  // CAMPANITAS
  // =========================================================

  const sonidosItems = [
    "/sounds/campanita1.wav",
    "sounds/campanita2.wav",
    "sounds/campanita3.wav",
    "sounds/campanitaslargas.wav",
    "sounds/crash.wav",
    "sounds/gong.wav",
  ];

  const itemCategories = document.getElementsByClassName("c");

  function randomSonido() {
    const random = Math.floor(Math.random() * sonidosItems.length);

    return sonidosItems[random];
  }

  function playSonido() {
    const audio = new Audio(randomSonido());

    audio.volume = 0.4;

    audio.play();
  }

  for (let i = 0; i < itemCategories.length; i++) {
    itemCategories[i].addEventListener("click", playSonido);
  }

  // =========================================================
  // ESTADO INICIAL
  // =========================================================

  hideReset();
});
