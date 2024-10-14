import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.scss',
})
export class CreateNewPostComponent {
  @ViewChild('fileInput') public fileInput!: ElementRef;
  public selectedImage: string | null = null;
  protected onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
      this.selectedImage = URL.createObjectURL(files[0]);
    }
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = URL.createObjectURL(file);
    }
  }

  protected triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  public handleFiles(files: FileList) {
    // Here you would typically upload the files to a server
    // For this example, we'll just log the file names
    Array.from(files).forEach((file) => {
      console.log(`File selected: ${file.name}`);
    });
  }
}
