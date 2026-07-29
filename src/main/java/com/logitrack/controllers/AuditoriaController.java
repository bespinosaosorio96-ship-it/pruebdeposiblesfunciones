package com.logitrack.controllers;

import com.logitrack.dto.AuditoriaDto;
import com.logitrack.enums.TipoOperacion;
import com.logitrack.services.AuditoriaService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/auditorias")
public class AuditoriaController {

    private final AuditoriaService auditoriaService;

    public AuditoriaController(AuditoriaService auditoriaService) {
        this.auditoriaService = auditoriaService;
    }

    @GetMapping
    public ResponseEntity<List<AuditoriaDto>> listarTodas() {
        return ResponseEntity.ok(auditoriaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditoriaDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(auditoriaService.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuario}")
    public ResponseEntity<List<AuditoriaDto>> buscarPorUsuario(
            @PathVariable String usuario) {

        return ResponseEntity.ok(
                auditoriaService.buscarPorUsuario(usuario));
    }

    @GetMapping("/tipo/{tipoOperacion}")
    public ResponseEntity<List<AuditoriaDto>> buscarPorTipoOperacion(
            @PathVariable TipoOperacion tipoOperacion) {

        return ResponseEntity.ok(
                auditoriaService.buscarPorTipoOperacion(tipoOperacion));
    }

    @GetMapping("/entidad/{entidadAfectada}")
    public ResponseEntity<List<AuditoriaDto>> buscarPorEntidad(
            @PathVariable String entidadAfectada) {

        return ResponseEntity.ok(
                auditoriaService.buscarPorEntidad(entidadAfectada));
    }

    @GetMapping("/registro/{entidadId}")
    public ResponseEntity<List<AuditoriaDto>> buscarPorEntidadId(
            @PathVariable Long entidadId) {

        return ResponseEntity.ok(
                auditoriaService.buscarPorEntidadId(entidadId));
    }

    @GetMapping("/fechas")
    public ResponseEntity<List<AuditoriaDto>> buscarPorRangoFechas(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime fechaInicio,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime fechaFin) {

        return ResponseEntity.ok(
                auditoriaService.buscarPorRangoFechas(
                        fechaInicio,
                        fechaFin));
    }

    @PostMapping
    public ResponseEntity<AuditoriaDto> guardar(
            @Valid @RequestBody AuditoriaDto auditoriaDto) {

        AuditoriaDto respuesta = auditoriaService.guardar(auditoriaDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(respuesta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        auditoriaService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}