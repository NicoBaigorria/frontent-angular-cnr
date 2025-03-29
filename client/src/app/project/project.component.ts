import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, FormsModule], // Agregar FormsModule aquí
})
export class ProjectComponent implements OnInit {
  projects: any[] = []; // Lista de proyectos
  selectedProject: any = null; // Proyecto seleccionado para agregar detalle
  newProject = { id: null, uuid: '', nombre: '', createdAt: '', status: false }; // Modelo para el proyecto
  newDetail = { id: null, description: '', area: null, status: false }; // Modelo para el detalle
  showPopup = false; // Controlar la visibilidad del formulario emergente

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects(); // Cargar proyectos al iniciar el componente
  }

  createProject() {
    const currentDate = new Date().toISOString(); // Generar la fecha actual en formato ISO 8601
    this.newProject.createdAt = currentDate;

    console.log('Request Body (Create Project):', this.newProject); // Mostrar el cuerpo de la solicitud
    this.http.post('http://localhost:8082/projects', this.newProject, { withCredentials: true }).subscribe(
      (response: any) => {
        alert('Proyecto creado con éxito');
        this.newProject = { id: null, uuid: '', nombre: '', createdAt: '', status: false }; // Limpiar el formulario
        this.loadProjects(); // Recargar la lista de proyectos
      },
      (error) => {
        console.error('Error al crear el proyecto:', error);
      }
    );
  }

  openDetailForm(project: any) {
    this.selectedProject = project; // Guardar el proyecto seleccionado
    this.newDetail = { id: null, description: '', area: null, status: false }; // Limpiar el formulario
    this.showPopup = true; // Mostrar el formulario emergente
  }

  addProjectDetail() {
    const detailPayload = {
      description: this.newDetail.description,
      area: this.newDetail.area,
      status: this.newDetail.status,
    };
  
    console.log('Request Body (Add Project Detail):', detailPayload); // Mostrar el cuerpo de la solicitud
    this.http.post(`http://localhost:8082/projects/${this.selectedProject.id}/details`, detailPayload, { withCredentials: true }).subscribe(
      (response: any) => {
        alert('Detalle agregado con éxito');
        this.showPopup = false; // Cerrar el formulario emergente
        this.newDetail = { id: null, description: '', area: null, status: false }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error al agregar el detalle:', error);
      }
    );
  }

  viewDetails(id: number) {
    console.log('Request Params (View Details):', { id }); // Mostrar los parámetros de la solicitud
    this.http.get(`http://localhost:8082/projects/${id}/details`, { withCredentials: true }).subscribe(
      (details: any) => {
        console.log('Detalles del proyecto:', details);
        alert(JSON.stringify(details)); // Mostrar detalles en un alert
      },
      (error) => {
        console.error('Error al obtener los detalles del proyecto:', error);
      }
    );
  }

  deleteProject(id: number) {
    console.log('Request Params (Delete Project):', { id }); // Mostrar los parámetros de la solicitud
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.http.delete(`http://localhost:8082/projects/${id}`, { withCredentials: true }).subscribe(
        () => {
          alert('Proyecto eliminado con éxito');
          this.loadProjects(); // Recargar la lista de proyectos
        },
        (error) => {
          console.error('Error al eliminar el proyecto:', error);
        }
      );
    }
  }

  loadProjects() {
    console.log('Request (Load Projects): No body required'); // Indicar que no hay cuerpo en la solicitud
    this.http.get('http://localhost:8082/projects', { withCredentials: true }).subscribe(
      (data: any) => {
        console.log('Response (Load Projects):', data); // Mostrar la respuesta
        this.projects = data; // Asignar los datos obtenidos a la lista de proyectos
      },
      (error) => {
        console.error('Error al cargar los proyectos:', error);
      }
    );
  }
}