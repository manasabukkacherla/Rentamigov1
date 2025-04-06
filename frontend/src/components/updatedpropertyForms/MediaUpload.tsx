import React from 'react';
import { Upload, Camera, Video, FileText, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Media Upload</h1>
    <div className="space-y-8">
          {/* Exterior Views */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Exterior Views
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your exterior photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
      </div>
            </div>
          </section>

          {/* Interior Views */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Interior Views
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your interior photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </button>
          </div>
                  <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
              </div>
            </div>
          </section>

          {/* Floor Plan */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Floor Plan
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your floor plan photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
              </div>
                          </div>
          </section>

          {/* Washrooms */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Washrooms
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your washrooms photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    Take Photo
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
              </div>
          </div>
          </section>

          {/* Lifts */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Lifts
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your lifts photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </button>
          </div>
                <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
              </div>
            </div>
          </section>

          {/* Emergency Exits */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Emergency Exits
              <span className="text-sm font-normal text-gray-500">0/5 photos uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Add your emergency exits photos in any way you prefer</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    Take Photo
              </button>
                </div>
                <p className="text-sm text-gray-500">
                  Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                </p>
              </div>
            </div>
          </section>

          {/* Property Video Tour */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5" />
              Property Video Tour (Optional)
              <span className="text-sm font-normal text-gray-500">0/1 video uploaded</span>
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Video className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Click to upload a video tour</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Video
                  </button>
        </div>
              <p className="text-sm text-gray-500">
                  Supported formats: MP4, WEBM (Max 100MB)
              </p>
            </div>
          </div>
          </section>

          {/* Legal Documents */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Legal Documents
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <FileText className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg mb-4">Click to upload legal documents</p>
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Files
                  </button>
                    </div>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Upload ownership proof, property tax documents, etc.</p>
                  <p>Supported formats: PDF, DOC, DOCX</p>
                </div>
              </div>
            </div>
          </section>

      {/* Upload Guidelines */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upload Guidelines:
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Upload clear, high-resolution images for each category</span>
          </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Ensure proper lighting and angles in all photos</span>
          </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Video tour should showcase the property comprehensively</span>
          </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Maximum video size: 100MB</span>
          </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Legal documents should be clear and complete</span>
          </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                <span>Supported document formats: PDF, DOC, DOCX</span>
          </li>
        </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;